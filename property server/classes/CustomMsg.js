class CustomMsg {
  static STATUSES = {
    Success: "Success",
    Failed: "Failed",
  };
  status;
  msg;
  msg2;
  constructor(status, msg, msg2) {
    this.status = status;
    this.msg = msg;
    this.msg2 = msg2;
  }
}

module.exports = CustomMsg;
