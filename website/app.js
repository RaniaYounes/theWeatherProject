/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth()+1
let newDate = month+'/'+ d.getDate()+'/'+ d.getFullYear();

//URL and API declaration 
let baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&APPID=0691c57eb267ca23b7044b1065b95ab5&units=metric';

//event listner for the button
const dataButton = document.getElementById('generate').addEventListener('click' ,(e)=>{
    const getZip = document.getElementById('zip');
    const getFeel = document.getElementById('feelings');
    const zipInput = getZip.value;
    const userInput =getFeel.value;   
    
    realURL(baseURL, zipInput, apiKey)

       .then (data =>postData("/addData", {date: newDate,
                                       temp: data.main.temp,
                                       cityName: data.name,
                                       content: userInput}))
            
                        
       .then(() => updateUI())
           
       });


        
     //Geting API data   
        const realURL = async(baseURL, zip, key) => {
            const res= await fetch(baseURL+zip+key)
            try{
                const data= await res.json();
                return data;
            } catch(error){
                console.log('error', error);
            }
        }
        //Posting data
        const postData = async(url ="", data = {}) => {
        
          console.log(data);
        
             const response = await fetch(url, {
            method:"POST",
            credentials:"same-origin",
            headers:{
                "content-Type": "application/json"
        
            },
            body: JSON.stringify(data)
        })
        try{
            const myData = await response.json()
            console.log(myData);
            return myData;
        
        }catch(error){
            console.log("error", error);
        }
        
        }
     //get data and send it to the page   
        const updateUI = async() => {
            const request = await fetch("/allData")
           
            try{
               const feedBack = await request.json();
            
               const print = document.getElementById("enter")
               print.innerHTML= `<strong>Date is:</strong> ${feedBack.date}<br><br>
                                 <strong>Country name is:</strong> ${feedBack.cityName}<br> <br>                                  
                                 <strong>Current temperature is:</strong> ${feedBack.temp} ⁰C <br><br>
                                 <strong>Your feeling is:</strong> ${feedBack.content} `;
              
          }catch(error){
                console.log("error", error);
            }
       }
        

    
     

