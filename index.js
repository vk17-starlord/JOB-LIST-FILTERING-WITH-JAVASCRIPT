
let Jobdata;
let filterarray = [

];



fetch('data.json')
.then(response => response.json())
.then(res => {
  Jobdata=res;
setCard()
})


  
  let card=``
  let toolsbtn=``
 



  function setCard(){
    let data=Jobdata;
    let featuredbadge =``
  
    data.forEach(element => {

      let filterdata =[]

 const languages=element.languages

  


let buttons =''
languages.forEach((language) =>{
  filterdata.push(language);
  buttons+=`<a class="tab-btn" onclick="filterCard('${language}')">${language}</a>`
}
  )

  const tools=element.tools

 let toolsbuttons =''
 tools.forEach((tool) =>{
  filterdata.push(tool);
  buttons+=`<a class="tab-btn"  onclick="filterCard('${tool}')">${tool}</a>`

 }
   )

let newbadge =``
   if(element.new){
newbadge=`<span id="badge" style="background-color: hsl(180, 29%, 50%);">NEW!</span>`
   }

let style=''
 
   if(element.featured){
     style=`border-left:5px solid hsl(180, 29%, 50%);`
featuredbadge=`<span id="badge" style="background-color: hsl(180, 14%, 20%)">FEATURED</span>`
   }

   let rolebtn=``
   if(element.role){
    filterdata.push(element.role);
    rolebtn+=`<a class="tab-btn"  onclick="filterCard('${element.role}')">${element.role}</a>`
   }

   let level=``
   if(element.level){
    filterdata.push(element.level);
    level+=`<a class="tab-btn"  onclick="filterCard('${element.level}')">${element.level}</a>`
   }


     card+=`
     
     

    <div class="row job-card"  data-filter='${filterdata}' >
      
    <div class="col s12 m8 l6" id="job-info">

      <div class="row"  >

        <div class="col s12 l3 m4" style="padding:20px" >
<div class="logo" style="background-image: url('${element.logo}');"></div>
        </div>

        <div class="col s12 l9 m8 job-desc" style="padding:20px"  >
<span>${element.company}</span>
${newbadge}
${featuredbadge}
<h5>${element.position}</h5>
<p class="grey-text">${element.postedAt}<span>.</span> ${element.contract} <span>.</span>${element.location}</p>
      </div>

      </div>

    </div>

    <div class="col s12 l6 m6" id="tablets">
    ${rolebtn}
    ${level}
    ${toolsbuttons}
   ${buttons}
   
    </div>

  </div>

     
     `

      });


document.getElementById('container').innerHTML=card;

  
  }


  function filterCard(category){ 
    filterarray.push(category);

    let chipcode=``

    filterarray.forEach((chip)=>{

       chipcode+=`
       <div class="chip" style="margin:30px auto; background-color: hsl(180, 31%, 95%); !important;border-radius:5px !important;">
       ${chip}
       <i class="close material-icons" onclick="removechip('${chip}')">close</i>
     </div>
       `
    })

    document.getElementById('search-bar').innerHTML=chipcode;
  const cards= document.getElementsByClassName('job-card');
  for(let i=0; i<cards.length;i++){

   let carddata=cards[i].dataset.filter.split(',');


   if( filterarray.every(v=> carddata.indexOf(v) !== -1)){
     console.log(cards[i])
   }else{
     cards[i].style.display='none'
   }



  }
  }



    function removechip(chip){

      const chipindex=filterarray.findIndex((ele)=>{
        return ele===chip;
      });
      console.log(chipindex)
      const cards= document.getElementsByClassName('job-card');
      if (chipindex > -1) {
      filterarray=filterarray.splice(chipindex, 1);
    
    
      for(let i=0; i<cards.length;i++){
    
       let carddata=cards[i].dataset.filter.split(',');
  
       if( filterarray.some(v=> carddata.indexOf(v) !== -1)){
          cards[i].style.display='block';
       }
  
      }
  
      }else{
         
      for(let i=0; i<cards.length;i++){
        cards[i].style.display='block';
       }
      }

      
     
      
       
    }


