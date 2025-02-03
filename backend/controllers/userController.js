import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Auth user && get token
// @route   Post api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

// @desc    Register
// @route   Post api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register');
});

// @desc    Logout
// @route   Post api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('out');
});

// @desc    Get users profile
// @route   Get api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('user profile');
});

// @desc    Update users profile
// @route   Put api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// @desc    Get users
// @route   Get api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('users');
});

// @desc    Get user by id
// @route   Get api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('user BY ID');
});

// @desc    Delete user
// @route   Delete api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('users');
});

// @desc    Update users
// @route   Put api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};