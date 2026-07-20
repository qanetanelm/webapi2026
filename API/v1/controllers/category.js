const categoryModel = require('../models/category');//יבוא המודל של קטגוריה (Mongo)
module.exports={
    getAll: async (req, res) => {//החזרת כל הקטגוריות
        try {
            const data = await categoryModel.find().lean();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getById: async (req, res) => {//החזרת קטגוריה לפי cID
        const cid = req.params.id;
        try {
            const data = await categoryModel.find({ cID: cid }).lean();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    deleteById: async (req, res) => {//מחיקת קטגוריה לפי cID
        const cid = req.params.id;
        try {
            const data = await categoryModel.deleteOne({ cID: cid });
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    add: async (req, res) => {//הוספת קטגוריה חדשה
        const data = req.body;
        try {
            const newCategory = new categoryModel(data);
            const savedCategory = await newCategory.save();
            return res.status(200).json(savedCategory);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    update: async (req, res) => {//עדכון קטגוריה קיימת לפי cID
        const cid = req.params.id;
        const data = req.body;
        try {
            const updatedCategory = await categoryModel.updateOne({ cID: cid }, data);
            return res.status(200).json(updatedCategory);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};
