
export default function    getPopular (dataType, searchTerm, keyword, offset )  {
        let params = "";           
        
        const end_url =  "https://api.themoviedb.org/3" ;
        const api_key = '1ef9fd0ce00ab1df135c8453b7222865' 

        if(searchTerm === "search" && keyword !== '' ){
            
            params += "/search/"+ dataType +"?api_key=" + api_key + "&query=" + keyword + "&include_adult=false"
        }else{
            params += "/"+ dataType +"/popular?api_key=" + api_key 
        }

        params += "&language=en-US&page="+offset

        return fetch(end_url + params )
        .then(res =>  res.json())
        // .then((data) => {  return data} )

    }
