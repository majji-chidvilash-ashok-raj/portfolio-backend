import About from "../models/aboutModel.js";


export const getAboutInfo = async (req, res) => {
  try {
    const about = await About.findOne();

    return res.status(200).json({
      success: true,
      about
    });

  } catch (error) {
    console.error("GET ABOUT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const updateAboutInfo = async (req, res) => {
  try {
    const { heroTitle, heroSubtitle, heroTagline, resumeUrl } = req.body;

    if (!heroTitle || !heroSubtitle || !heroTagline) {
      return res.status(400).json({ message: "Hero text fields are required" });
    }

    const finalResume = resumeUrl && resumeUrl.trim() !== "" ? resumeUrl : "/";

    let about = await About.findOne();


    if (!about) {
      about = await About.create({
        heroTitle,
        heroSubtitle,
        heroTagline,
        resumeUrl: finalResume
      });

      return res.status(201).json({
        success: true,
        message: "About section created successfully",
        about
      });
    }
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { heroTitle, heroSubtitle, heroTagline, resumeUrl: finalResume },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "About section updated successfully",
      about: updatedAbout
    });

  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
