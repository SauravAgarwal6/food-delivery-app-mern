import foodModel from "../models/foodModel.js";
import fs from 'fs'
// Add food item
const addFood = async (req, res) => {
  try {
    // Ensure file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price), // ensure numeric
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food added successfully",
      data: food,
    });
  } catch (error) {
    console.error("Error adding food:", error);

    res.status(500).json({
      success: false,
      message: "Error occurred while adding food",
      error: error.message,
    });
  }
};

//all Food List
const listFood =async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            data:foods,
            success:true,
            message:"Data visible"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            error:error.message
        })
    }
}

//remove food 
const removeFood  = async(req,res)=>{
    try { 
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,() => {})

        const foodItem = await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"Food removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export { addFood ,listFood ,removeFood};
