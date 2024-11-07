"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuesService = void 0;
const dues_model_1 = require("../models/dues.model");
class DuesService {
    async createDues(duesData) {
        const dues = new dues_model_1.Dues(duesData);
        return await dues.save();
    }
    async getDuesById(duesId) {
        return await dues_model_1.Dues.findById(duesId).exec();
    }
    async updateDues(duesId, updateData) {
        return await dues_model_1.Dues.findByIdAndUpdate(duesId, updateData, { new: true }).exec();
    }
    async deleteDues(duesId) {
        return await dues_model_1.Dues.findByIdAndDelete(duesId).exec();
    }
    async getAllDues() {
        return await dues_model_1.Dues.find().exec();
    }
}
exports.DuesService = DuesService;
