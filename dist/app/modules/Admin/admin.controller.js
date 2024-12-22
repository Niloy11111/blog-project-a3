"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const admin_service_1 = require("./admin.service");
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log({ user: req.user, params: req.params });
    const id = req.params.userId;
    yield admin_service_1.adminServices.blockUserFromDB(id);
    // const { id } = req.params;
    // const authorId = req?.user?._id;
    // const findBlog = await Blog.findById(id);
    // if (findBlog?.author.toString() !== authorId) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    // }
    // const blog = await adminServices.blockUserFromDB(id, { isBlocked : true });
    // console.log('here', req.user, req.params);
    res.send({
        success: true,
        message: 'user blocked successfully',
        statusCode: 200,
    });
}));
const deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield admin_service_1.adminServices.deleteBlogByAdminFromDB(id);
    res.send({
        success: true,
        message: 'blog deleted successfully',
        statusCode: 200,
    });
}));
exports.AdminControllers = {
    deleteBlogByAdmin,
    blockUser,
};