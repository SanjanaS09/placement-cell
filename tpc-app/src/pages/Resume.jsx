// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import database from "../FirebaseConfig";

// const API_KEY = "AIzaSyCW6nLQ0YO94IJBIvceIKTxrAJu7TMh0sQ"; // Replace with your actual API key
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function fileToGenerativePart(file) {
//   const base64EncodedDataPromise = new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]);
//     reader.readAsDataURL(file);
//   });
// //   return {
//     inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
//   };
// }

// const MarkComplete = ({ task, selectedTeam, orgId, loggedInUser }) => {
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");

//   if (task.status === "completed") {
//     alert("Already Marked Complete");
//     return null;
//   }

//   const handleImageCapture = (event) => {
//     const fileInputEl = event.target;
//     setImage(fileInputEl.files[0]);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImagePreview(e.target.result);
//     };
//     reader.readAsDataURL(fileInputEl.files[0]);
//   };

//   const handleMarkComplete = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please capture an image.");
//       return;
//     }

//     // File size validation
//     const maxFileSize = 4 * 1024 * 1024; // 4MB
//     if (image.size > maxFileSize) {
//       alert("File size should be less than 4MB.");
//       return;
//     }

//     // File type validation
//     const allowedTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/webp",
//       "image/heic",
//       "image/heif",
//     ];
//     if (!allowedTypes.includes(image.type)) {
//       alert(
//         "Invalid file type. Please upload an image in .png, .jpeg, .webp, .heic, or .heif format."
//       );
//       return;
//     }

//     const imageParts = await Promise.all([image].map(fileToGenerativePart));

//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     try {
//       const prompt = `Task: ${task.title} \nBased on the task mentioned above, analyze the uploaded image thoroughly and determine whether it was completed properly or not. Your analysis should be strict and precise. Provide your analysis in JSON format with the keys "report" and "report_description". Set "report" to "yes" if the task was completed properly and "no" if it was not done right. Use "report_description" to provide a detailed description of your analysis. 
//       \nSample JSON Format:{"report": "no","report_description": "Detailed description explaining why the task was not completed properly."}\n\n\n
//       Additional Instructions:\nEnsure your analysis is based solely on the information provided in the image.\nBe thorough and specific in your analysis, highlighting any discrepancies or areas of improvement.\nUse clear language and provide reasoning for your assessment.\nConsider all aspects of the task, including its requirements and expected outcomes.\nNote: Response will be converted as JSON data, so generate response accordingly.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       let text = await response.text();
//       console.log(text);
//       text = JSON.parse(
//         text.replace("json", "").replace("", "").replace("", "")
//       );
//       console.log(text);
//       const updatedTask = {
//         ...task,
//         report: text.report,
//         report_description: text.report_description,
//         status: "completed",
//         completed_by: loggedInUser,
//       };

//       await database
//         .ref(${orgId}/teams/${selectedTeam}/tasks/${task.task_id})
//         .set(updatedTask);

//       setImage(null);
//       setImagePreview(null);

//       alert("Task marked as complete!");
//     } catch (error) {
//       console.error("Error analyzing image:", error);
//       alert("An error occurred while analyzing the image. Please try again.");
//     }
//   };

//   return (
//     <div className="markCompleteComponent">
//       <h3>Mark Complete</h3>
//       <form onSubmit={handleMarkComplete}>
//         <div className="form-group">
//           <label htmlFor="imageCapture"><strong>U Image:</strong></label>
//           <br />
//           <input
//             type="file"
//             id="imageCapture"
//             onChange={handleImageCapture}
//             capture="environment"
//             accept="image/*"
//             required
//           />
//         </div>
//         <br />
//         {imagePreview && (
//           <div className="preview">
//             <h4>Preview:</h4>
//             <img src={imagePreview} alt="Uploaded" className="filePreview" width={"150px"} />
//           </div>
//         )}
//         {/* <div className="form-group">
//           <label htmlFor="report">Report:</label>
//           <input
//             type="text"
//             id="report"
//             value={report}
//             onChange={(e) => setReport(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="reportDescription">Report Description:</label>
//           <textarea
//             id="reportDescription"
//             value={reportDescription}
//             onChange={(e) => setReportDescription(e.target.value)}
//             rows="4"
//             required
//           ></textarea>
//         </div> */}
//         <button type="submit">Mark Complete</button>
//       </form>
//     </div>
//   );
// };

// export default MarkComplete;