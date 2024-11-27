import mongoose, { Schema, Document, Model, HookNextFunction } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    password: string;
    mobileNo: number;
    isVerified: boolean;
    isAdmin: boolean;
    forgetPasswordToken?: string;
    forgetPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    preferences?: {
        favoriteDestinations?: string[];
        travelModes?: string[];
        budgetRange?: {
            min?: number;
            max?: number;
        };
    };
    plannedTrips?: {
        destination: string;
  startDate: Date;
  endDate: Date;
  accommodation?: string;
  activities?: string[];
  status?: "upcoming" | "completed" | "canceled";
  name?: string;
  tickets?: number;
  phone?: string;
  chosenItems?: {
    title: string;
    type: string;
    details: Record<string, any>;
  }[];
    }[];
    pastTrips?: {
        destination: string;
        startDate: Date;
        endDate: Date;
        accommodation?: string;
        activities?: string[];
        rating?: number;
        review?: string;
    }[];
    // wishlist?: string[];
    // createdAt: Date;
    // updatedAt: Date;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: [true, "Please provide the first name!"],
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, "Please provide the email!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide the password!"],
    },
    profilePicture: {
        type: String,
        default: null
    },
    mobileNo: {
        type: Number,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: { type: String, default: undefined },
    forgetPasswordTokenExpiry: { type: Date, default: undefined },
    verifyToken: { type: String, default: undefined },
    verifyTokenExpiry: { type: Date, default: undefined },
    preferences: {
        favoriteDestinations: { type: [String], default: [] },
        travelModes: { type: [String], default: [] },
        budgetRange: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
        },
    },
    plannedTrips: [
        {
            destination: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            accommodation: { type: String, default: "" },
            activities: { type: [String], default: [] },
            status: {
                type: String,
                enum: ["upcoming", "completed", "canceled"],
                default: "upcoming",
            },
            name: { type: String, default: 'Anonymous' },
            tickets: { type: Number, default: 1 },
            phone: { type: String, default: 'Not provided' },
            chosenItems: [
                {
                    title: { type: String, required: true },
                    type: { type: String, required: true },
                    details: { type: Schema.Types.Mixed, required: true },
                },
            ],
        },
    ],
    pastTrips: [
        {
            destination: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            accommodation: { type: String, default: "" },
            activities: { type: [String], default: [] },
            rating: { type: Number, min: 1, max: 5, default: 3 },
            review: { type: String, default: "" },
        },
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


// Middleware to update `updatedAt` before saving
userSchema.pre<IUser>("save", function (next: HookNextFunction) {
    this.updatedAt = new Date();
    next();
});

// Create the User model or use an existing one
const User: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema, "Users");

export default User;
