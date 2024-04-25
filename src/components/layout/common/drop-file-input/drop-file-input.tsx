// import { forwardRef } from "react";

// export interface InputProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

// const FileInput = forwardRef<HTMLInputElement, InputProps>(
//   ({ ...props }, ref) => {
//     return (
//       <>
//         <div
//                   className="absolute inset-0 cursor-pointer"
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 />
//           <input
//             {...props}
//             ref={ref}
//             multiple
//             onChange={handleChange}
//             accept="image/jpeg, image/jpg, image/png"
//             id="dropzone-file"
//             type="file"
//             className="hidden"
//           />
//         </div>
//       </>
//     );
//   }
// );
