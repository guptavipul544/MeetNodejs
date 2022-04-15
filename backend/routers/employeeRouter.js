import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employees from '../models/Employees.js';
import Companies from '../models/Companies.js';


const employeeRouter = express.Router(); 


//4. Get the List of all employees for a particular company
employeeRouter.get('/:companyName', expressAsyncHandler(async(req,res)=>{
    const Name = req.params.companyName;

    const company = await Employees.find({"cmpName":{ $regex: Name , $options: 'i' }});
    
     
      if(company.length===0){
    
          res.status(404).send({message:'Company Not Found'});
      
      }
      else{
       
        const employees = await Employees.find({"cmpName":{ $regex: Name , $options: 'i' }});
        res.send(employees);
      }
  
}));


// 2.Create a new employee for existing company
employeeRouter.post(
    '/:companyName',
    expressAsyncHandler(async (req, res) => {

      const Name = req.params.companyName;

      const company = await Companies.find({"cmpName":Name}).collation( { locale: 'en', strength: 2 });
     
     
      
        if(company.length===0){
    
          res.status(404).send({message:'Company Not Found'});
      
      }
     else{
      const employees = new Employees({

        empName: req.body.empName,
        empEmail: req.body.empEmail,
        empPhone:req.body.empPhone,
        empAddress:req.body.empAddress,
        cmpName:Name
      });

      const createdEmployees = await employees.save();
      await Companies.updateOne( {"cmpName":{ $regex: Name , $options: 'i' }},
      { $inc: { number_of_emp: 1 } });
      res.send({ message: 'Employee Created', employees: createdEmployees });
    }

    
    })
  
  );

  export default employeeRouter;