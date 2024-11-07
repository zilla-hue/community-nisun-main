"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpouseRequestService = void 0;
const spouse_request_model_1 = require("../models/spouse-request.model");
class SpouseRequestService {
    async createSpouseRequest(spouseRequestData) {
        const spouseRequest = new spouse_request_model_1.SpouseRequest(spouseRequestData);
        return await spouseRequest.save();
    }
    async getSpouseRequestById(spouseRequestId) {
        return await spouse_request_model_1.SpouseRequest.findById(spouseRequestId).exec();
    }
    async updateSpouseRequest(spouseRequestId, updateData) {
        return await spouse_request_model_1.SpouseRequest.findByIdAndUpdate(spouseRequestId, updateData, { new: true }).exec();
    }
    async deleteSpouseRequest(spouseRequestId) {
        return await spouse_request_model_1.SpouseRequest.findByIdAndDelete(spouseRequestId).exec();
    }
    async getAllSpouseRequests() {
        return await spouse_request_model_1.SpouseRequest.find().exec();
    }
}
exports.SpouseRequestService = SpouseRequestService;
