import axios from 'axios'

const data = () =>{
    let aux=[{}];
        axios.get('http://localhost:5000/qhighscores/')
        .then(response=> {

            response.data.forEach((item, index)  => {
                aux.push({
                    'owner':item.username,
                    'score':item.score
                })     
            });
          
        })
    return(aux)
}

exports.data =data;