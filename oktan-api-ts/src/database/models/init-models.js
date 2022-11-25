var DataTypes = require("sequelize").DataTypes;
var _bank_account = require("./bank_account");
var _competition = require("./competition");
var _competition_sub_theme = require("./competition_sub_theme");
var _competition_submission = require("./competition_submission");
var _invoice = require("./invoice");
var _member = require("./member");
var _member_notification = require("./member_notification");
var _moderator = require("./moderator");
var _participant = require("./participant");
var _password_token = require("./password_token");
var _refresh_token = require("./refresh_token");
var _team_member = require("./team_member");
var _user = require("./user");
var _verification_token = require("./verification_token");

function initModels(sequelize) {
  var bank_account = _bank_account(sequelize, DataTypes);
  var competition = _competition(sequelize, DataTypes);
  var competition_sub_theme = _competition_sub_theme(sequelize, DataTypes);
  var competition_submission = _competition_submission(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var member_notification = _member_notification(sequelize, DataTypes);
  var moderator = _moderator(sequelize, DataTypes);
  var participant = _participant(sequelize, DataTypes);
  var password_token = _password_token(sequelize, DataTypes);
  var refresh_token = _refresh_token(sequelize, DataTypes);
  var team_member = _team_member(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var verification_token = _verification_token(sequelize, DataTypes);

  invoice.belongsTo(bank_account, { as: "paymentTo", foreignKey: "paymentToId"});
  bank_account.hasMany(invoice, { as: "invoices", foreignKey: "paymentToId"});
  invoice.belongsTo(bank_account, { as: "bankAccount", foreignKey: "bankAccountId"});
  bank_account.hasMany(invoice, { as: "bankAccount_invoices", foreignKey: "bankAccountId"});
  competition_sub_theme.belongsTo(competition, { as: "competition", foreignKey: "competitionId"});
  competition.hasMany(competition_sub_theme, { as: "competition_sub_themes", foreignKey: "competitionId"});
  invoice.belongsTo(competition, { as: "competition", foreignKey: "competitionId"});
  competition.hasMany(invoice, { as: "invoices", foreignKey: "competitionId"});
  member_notification.belongsTo(competition, { as: "competition", foreignKey: "competitionId"});
  competition.hasMany(member_notification, { as: "member_notifications", foreignKey: "competitionId"});
  participant.belongsTo(competition, { as: "competition", foreignKey: "competitionId"});
  competition.hasMany(participant, { as: "participants", foreignKey: "competitionId"});
  invoice.belongsTo(member, { as: "member", foreignKey: "memberId"});
  member.hasMany(invoice, { as: "invoices", foreignKey: "memberId"});
  member_notification.belongsTo(member, { as: "member", foreignKey: "memberId"});
  member.hasMany(member_notification, { as: "member_notifications", foreignKey: "memberId"});
  participant.belongsTo(member, { as: "member", foreignKey: "memberId"});
  member.hasMany(participant, { as: "participants", foreignKey: "memberId"});
  member_notification.belongsTo(moderator, { as: "from_moderator", foreignKey: "from"});
  moderator.hasMany(member_notification, { as: "member_notifications", foreignKey: "from"});
  competition_submission.belongsTo(participant, { as: "participant", foreignKey: "participantId"});
  participant.hasMany(competition_submission, { as: "competition_submissions", foreignKey: "participantId"});
  team_member.belongsTo(participant, { as: "participant", foreignKey: "participantId"});
  participant.hasMany(team_member, { as: "team_members", foreignKey: "participantId"});
  member.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(member, { as: "members", foreignKey: "userId"});
  moderator.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(moderator, { as: "moderators", foreignKey: "userId"});
  password_token.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(password_token, { as: "password_tokens", foreignKey: "userId"});
  refresh_token.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(refresh_token, { as: "refresh_tokens", foreignKey: "userId"});
  verification_token.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(verification_token, { as: "verification_tokens", foreignKey: "userId"});

  return {
    bank_account,
    competition,
    competition_sub_theme,
    competition_submission,
    invoice,
    member,
    member_notification,
    moderator,
    participant,
    password_token,
    refresh_token,
    team_member,
    user,
    verification_token,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
