import mongoose from 'mongoose';

const employeesSchema = new mongoose.Schema(
    {
        empName: {type: String, required: true},
        empEmail: {type: String, required: true, unique: true},
        empPhone:{ type: Number, required: true,unique: true},
        empAddress:{ type: String, required: true},
        cmpName:{ type: String, required: true}
        
    },
    {
        timestamps: true,
    }
);

const Employees = mongoose.model('Employees',employeesSchema);

export default Employees;