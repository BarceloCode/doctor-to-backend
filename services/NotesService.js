const NotesSchema = require("../models/NotesModel");
require("dotenv").config({ path: "../.env" });

async function create (req, res){
    try{
        const notesExist = await NotesSchema.findOne({ patient: req.body.patient });
        if(!notesExist) {         
            const dataToSave = req.body;                       
            const notes = new NotesSchema(dataToSave);
                await notes
                .save()
                .then((result) => {
                    res.json({ 
                        message: "Note added",
                        success: true, 
                        result: result 
                    })
                })
                .catch((err) =>{
                    res.json({
                        message: "Error", 
                        success: false, 
                        result: err
                    })
                })
        }else{
            const descriptionExist = notesExist.notes;            
            const { notes } = req.body;                    
            let updateNotes = await NotesSchema.findOneAndUpdate({patient: req.body.patient},{
                notes: descriptionExist.concat(notes)                
            })
            return {
                message: "Note added",
                success: true,
                result: updateNotes,                
            }                   
        }                  
    }catch(error){
        res.send(error);
    }
}

async function getAll (req, res) {
    try{
        await NotesSchema.find()
        .populate({
            path: "patient",
            select: { name: 1, surname: 1}
        }).then((result) =>{
            res.json({ 
                success: true, 
                result: result
            })
            .catch((error) => {
                res.json({
                    success: false,
                    result: error
                })
            })
        })
    }catch(error){
        res.send(error);
    }
}

async function getuserNotes(req, res){
    try{
        await NotesSchema.findOne({ patient: req.body.patient })
        .populate({
            path: "patient",
            select: { name: 1, surname: 1}
        }).then((result) => {
            res.json({
                message: "Success!",
                success: true,
                result: result
            })            
        }).catch((error) => {
            res.json({
                message: "Notes not found",
                success: false,
                result: error
            })
        })
    }catch(error){
        return {
            message: "Error: " + error
        }
    }
}

async function deleteuserNotes (req, res) {
    try{
        const id  = req.params.id;
        const objetctoDelete = req.body.objetctoDelete;

        const notes = await NotesSchema.findOneAndUpdate(
            id,
            { $pull: { notes: objetctoDelete } },
            { new: true }
        );
        if(!notes) res.json({ message: "Can't found note"});

        res.json({
            message: "Note deleted!",
            success: true
        })
    }catch (error){
        return {
            message: "Internal server error!: " + error
        }
    }
}




module.exports = { create, getAll, getuserNotes, deleteuserNotes }