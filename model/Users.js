const { mongoose } = require("./mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  givenName: {
    type: String,
    required: true,
    trim: true
  },
  familyName: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum : ['Student', 'Org'],
    required: true,
    trim: true
  },
});

UserSchema.methods.toJSON = function() {
  const data = this;
  const obj = data.toObject();

  return {
    ...obj,
    _id: undefined,
    __v: undefined
  };
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
