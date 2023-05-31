/*jslint node: true */
"use strict";
import soap from 'soap';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { request, gql } from 'graphql-request'


import { example } from './example.js';
import consume from './request.js'

const url = "http://172.17.0.6/graphql";

function getActInformationById(id) {
    const query = gql `{
        getActInformation(groupId:${id}){
          courseName
          teacherName
          currentDate
          gradesList{
            group_id
            student_name
            final_grade
            absences
            approved
            reason
          }
        }
      }`
    return query
}

// the function, used by the service
function main(args, callback) {
    const id = args.id;
    request(url, getActInformationById(id))
        .then((data) => {
            const act = data.getActInformation;
            callback({
                result: act
            });
        })
        .catch(error => {
            console.log(error)
            callback({
                example
            })
        })
}

// the service
var serviceObject = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: main
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: main
        }
    }
};

const xml = fs.readFileSync('service.wsdl', 'utf8');
const app = express();

app.use(cors());

// root handler
app.get('/', function(req, res) {
    res.send('Node Soap Example!<br /><a href="/wsdl?wsdl">Wsdl endpoint</a>');
})

//routes for consuming the other system
app.get('/consume/:id', consume);

// Launch the server and listen
const port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check port " + port + " to see if the service is working");
});
