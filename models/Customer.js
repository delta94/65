const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: String,
    email: String,
    googleId: String,
    facebookId: String,
    phone: String,
    notes: {
      type: String,
      maxlength: 1000
    },
    blacklisted: Boolean,
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "reservations"
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

customerSchema.index({ name: "text" });

customerSchema.virtual("isAdmin").get(function() {
  return false;
});

mongoose.model("customers", customerSchema);
