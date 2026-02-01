import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    title: {
      type: String,
      required: true,
    },
    sections: {
      personal: {
        name: {
          type: String,
          required: true,
        },
        email: String,
        phone: String,
        linkedin: String,
        location: String,
      },
      summary: {
        type: String,
      },
      skills: [String],
      education: [
        {
          school: String,
          degree: String,
          year: String,
          gpa: String,
        },
      ],
      experience: [
        {
          company: String,
          role: String,
          dates: String,
          bullets: [String],
        },
      ],
      projects: [
        {
          name: String,
          bullets: [String],
          github: String,
        },
      ],
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    jobKeywords: [String],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Resume", resumeSchema);
