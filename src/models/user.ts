import mongoose from 'mongoose';

/* RecipeSchema will correspond to the recipe collection in the MongoDB database. */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },

});

export default mongoose.models.User || mongoose.model('_User', UserSchema);