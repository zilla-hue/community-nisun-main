"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildService = void 0;
const child_model_1 = require("../models/child.model");
class ChildService {
    async createChild(childData) {
        const child = new child_model_1.Child(childData);
        return await child.save();
    }
    async getChildById(childId) {
        return await child_model_1.Child.findById(childId).exec();
    }
    async updateChild(childId, updateData) {
        return await child_model_1.Child.findByIdAndUpdate(childId, updateData, { new: true }).exec();
    }
    async deleteChild(childId) {
        return await child_model_1.Child.findByIdAndDelete(childId).exec();
    }
    async getAllChildren() {
        return await child_model_1.Child.find().exec();
    }
}
exports.ChildService = ChildService;
