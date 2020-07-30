const request = require ('request')

const forecast = (latitude , longitude , callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=e455ec5286e80593416307163421b876&query='+latitude+','+ longitude

    request ({url, json:true}, (error,{ body })=> {
        if (error)
        {
           callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error)
        {
           callback ('Unable to find location', undefined)
        }
        else
        {
           callback (undefined, 
               body.current.weather_descriptions[0] + '. The temperature is '+ body.current.temperature + ' degrees, It feels like ' +body.current.feelslike+ ' degrees. The humidity is '+body.current.humidity+'% and the chance of rain is '+body.current.precip*100+ '%. Hope you have a nice day  ! :)' 
              )
        }
     })
}

module.exports = forecast