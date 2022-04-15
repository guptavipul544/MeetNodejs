import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Companies from '../models/Companies.js';


const companyRouter = express.Router(); 


//3. Get All Companies: sort the Companies in descending order of number of employees
companyRouter.get('/', expressAsyncHandler(async(req,res)=>{
  const products = await Companies.find({}).sort({number_of_emp : -1 });
  res.send(products);
}));


//5.Search for a Company: pass the company name as a path parameter and list out the matching companies 
companyRouter.get('/:companyName', expressAsyncHandler(async(req,res)=>{
  const Name = req.params.companyName;
  const company = await Companies.find({"cmpName":{ $regex: Name , $options: 'i' }});
   if(company.length===0){
  
        res.status(404).send({message:'Company Not Found'});
    
    }
    else{
     
      const companies = await Companies.find({"cmpName":{ $regex: Name , $options: 'i' }});
      res.send(companies);
    }

}));


// 1.Create a new comapny 
companyRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
      const companies = new Companies({
        cmpName: req.body.cmpName,
        cmpEmail: req.body.cmpEmail,
        cmpLocation: req.body.cmpLocation,
        cmpPhone:req.body.cmpPhone,
        number_of_emp:req.body.number_of_emp
      });
      const createdCompany = await companies.save();
      res.send({ message: 'Product Created', companies: createdCompany });
    })
  );


  export default companyRouter;