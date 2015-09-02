var mongoose = require('mongoose');

var NameSchema = new mongoose.Schema({
	name: String,
	name_created_at: String
});

mongoose.model('Name', NameSchema);

var DiscussionSchema = new mongoose.Schema({
	discussion_name: String,
	discussion_name_id: String,
	discussion_topic: String,
	discussion_description: String,
	discussion_category: String,
	discussion_likes: Number,
	discussion_dislikes: Number,
	discussion_created_at: String
});

mongoose.model('Discussion', DiscussionSchema);

var AnswerSchema = new mongoose.Schema({
	answer_name: String,
	answer_name_id: String,
	answer_discussion_id: String,
	answer_answer: String,
	answer_created_at: String
});

mongoose.model('Answer', AnswerSchema);