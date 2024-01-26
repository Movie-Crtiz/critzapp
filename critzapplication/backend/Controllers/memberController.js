const Member = require('../Models/memberModel');

// Controller functions
const createMember = async (firstName, lastName, email, password) => {
  try {
    const member = await Member.create({ firstName, lastName, email, password });
    return member;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

const getMemberByEmail = async (email) => {
  try {
    const member = await Member.findOne({ email }).exec();
    return member;
  } catch (error) {
    console.error('Error getting member by email:', error);
    throw error;
  }
};

const getAllMembers = async () => {
  try {
    const allMembers = await Member.find();
    return allMembers;
  } catch (error) {
    throw new Error(`Error fetching all Members: ${error.message}`);
  }
};

module.exports = {
  createMember,
  getMemberByEmail,
  getAllMembers,
};
