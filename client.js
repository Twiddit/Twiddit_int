// npm install soap
import soap from 'soap';

//const url = 'http://localhost:8000/wsdl?wsdl';
const url = 'https://92c6-186-29-56-149.ngrok.io/wsdl?wsdl';

// Create client
soap.createClient(url, function(err, client) {
    if (err) {
        throw err;
    }
    /* 
     * Parameters of the service call: they need to be called as specified
     * in the WSDL file
     */
    var args = {
        id: 3
    };
    // call the service
    client.MessageSplitter(args, function(err, res) {
        if (err)
            throw err;
        // print the service returned result
        console.log(res);
    });
});