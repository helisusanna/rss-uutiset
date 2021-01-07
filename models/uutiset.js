const fetch = require("node-fetch");
const xml2js = require("xml2js");

let haeUutiset = (yle_url, hs_url, il_url) => {
    let uutiset = [];
        let yle = new Promise((resolve, reject) => {

            fetch(yle_url).then((response) => {

                response.text().then((dataXML) => {
        
                    xml2js.parseString(dataXML, (err, dataJSON) => {
        
                        if (err) {
                            
                            reject("Data ei ole xml-muodossa");
    
                        } else {
              
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let yle_uutinenObj;
                          
                                if (item.enclosure === undefined) {
                                    yle_uutinenObj =  {
                                        "sisalto" : item.description[0],
                                        "linkki" : item.link[0],
                                        "kuva" : "img/eikuvaa.png",
                                        "pvm" : new Date(item.pubDate[0]),
                                        "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB").slice(12, 17)
                                    }
                                } else {
    
                                    yle_uutinenObj =  {
                                                    "sisalto" : item.description[0],
                                                    "linkki" : item.link[0],
                                                    "kuva" : item.enclosure[0].$.url,
                                                    "pvm" : new Date(item.pubDate[0]),
                                                    "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB").slice(12, 17)
                                                }
                                }
    
                                uutiset.push(yle_uutinenObj);
    
                            });
                            setTimeout(() => {
                                resolve(uutiset)
                            }, 2000)
                        }//else
    
                    });//parseString
                })//response

            }).catch((err) => {

                reject("Palvelimeen ei saatu yhteyttä");

            });
            
        });//promise

        let hs =  new Promise((resolve, reject) => {

            fetch(hs_url).then((response) => {

                response.text().then((dataXML) => {
        
                    xml2js.parseString(dataXML, (err, dataJSON) => {
        
                        if (err) {
                            
                            reject("Data ei ole xml-muodossa");
    
                        } else {
    
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let hs_uutinenObj;
                          
                                if (item.enclosure === undefined) {
                                    hs_uutinenObj =  {
                                        "sisalto" : item.description[0],
                                        "linkki" : item.link[0],
                                        "kuva" : "img/eikuvaa.png",
                                        "pvm" : new Date(item.pubDate[0]),
                                        "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB").slice(12, 17)
                                    }
                                } else {
    
                                    hs_uutinenObj =  {
                                                    "sisalto" : item.description[0],
                                                    "linkki" : item.link[0],
                                                    "kuva" : item.enclosure[0].$.url,
                                                    "pvm" : new Date(item.pubDate[0]),
                                                    "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB").slice(12, 17)
                                                }
                                }
    
                                uutiset.push(hs_uutinenObj);
    
                            });
                            setTimeout(() => {
                                resolve(uutiset)
                            }, 2000)
                        }//else
    
                    });//parseString
                })//response

            }).catch((err) => {

                reject("Palvelimeen ei saatu yhteyttä");

            });

        });//promise
        
        let il =  new Promise((resolve, reject) => {

            fetch(il_url).then((response) => {

                response.text().then((dataXML) => {
        
                    xml2js.parseString(dataXML, (err, dataJSON) => {
        
                        if (err) {
                            
                            reject("Data ei ole xml-muodossa");
    
                        } else {

                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let il_uutinenObj;
                          
                                if (item.enclosure === undefined) {
                                    il_uutinenObj =  {
                                        "sisalto" : item.description[0],
                                        "linkki" : item.link[0],
                                        "kuva" : "img/eikuvaa.png",
                                        "pvm" : new Date(item.pubDate[0]),
                                        "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB")
                                    }
                                } else {
    
                                    il_uutinenObj =  {
                                                    "sisalto" : item.description[0],
                                                    "linkki" : item.link[0],
                                                    "kuva" : item.enclosure[0].$.url,
                                                    "pvm" : new Date(item.pubDate[0]),
                                                    "klo" : new Date(item.pubDate[0]).toLocaleString("en-GB").slice(12, 17)
                                                }
                                }
    
                                uutiset.push(il_uutinenObj);
    
                            });
                            setTimeout(() => {
                                resolve(uutiset)
                            }, 2000)
                        }//else
    
                    });//parseString
                })//response

            }).catch((err) => {

                reject("Palvelimeen ei saatu yhteyttä");

            });

        });//promise



    const promises = [yle];

    return Promise.all(promises).then(values => {

        return values;

    });

}

module.exports = {

    "haeKaikki" : (callback) => {

        let yle_url = "https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET";
        let hs_url = "https://www.hs.fi/rss/tuoreimmat.xml";
        let il_url = "https://www.iltalehti.fi/rss.xml";

        haeUutiset(yle_url, hs_url, il_url).then((response) => {

            callback(null, response);

        }).catch((err) => {

            callback(err, null);

        });        


    }

}