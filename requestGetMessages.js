import soap from 'soap';

const url = "http://34.173.4.99:8000/?wsdl"

export default async(req, res) => {
    const email = req.params.email;
    const n = req.params.n;
    var wsdlOptions = {
        attributesKey: '$attributes'
      };

    soap.createClient(url,wsdlOptions, function(err, client) {
        if (err) {
            throw err;
        }
        /* 
         * Parameters of the service call: they need to be called as specified
         * in the WSDL file
         */
        var args = {
            
                email: {
                $value: email,
                $attributes: {
                    type:'xsd:string'
                  }
                },
                n: {
                $value: n,
                $attributes: {
                    type:'xsd:int'
                 }
                }
              
        };
        // call the service
        client.GetLastNMessages(args, function(err, response) {
            if (err)
                throw err;
            // print the service returned result
            var result = response;
            if (typeof(result.result.result)==='string'){
                result.result.result=[result.result.result]
                return res.json(result)
            }
            
            console.log(result)
            return res.json(result);
        });
    });
};