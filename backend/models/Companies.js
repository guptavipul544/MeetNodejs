import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema(
    {
        cmpName: {type: String, required: true,unique: true},
        
        number_of_emp:{ type: Number, required: true},

        cmpEmail: {type: String, required: true, unique: true},
        cmpLocation: {type: String, required: true},
        cmpPhone:{ type: Number, required: true, unique: true}
        
       
        
    },
    {
        timestamps: true,
    }
);

const Companies = mongoose.model('Companies',companiesSchema);

export default Companies;