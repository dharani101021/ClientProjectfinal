// import React, { useRef } from 'react';
// import { Plus } from 'lucide-react';
// import { projects } from '../../data/projects';

// const ProjectsSection = ({ isVisible }) => {
//   const scrollRef = useRef(null);

//   const handleProjectClick = (project) => {
//     if (project.url) {
//       window.open(project.url, '_blank');
//     } else {
//       window.location.href = `/projects/${project.id}`;
//     }
//     console.log('Navigating to project:', project.title);
//   };

//   return (
//     <section className={`fixed inset-0 flex flex-col justify-center py-20 bg-white transition-transform duration-1000 ${
//       isVisible ? 'translate-x-0' : 'translate-x-full'
//     }`}>
//       <div className="px-8 mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">SELECTED PROJECTS</h2>
//         <p className="text-gray-600 tracking-wide">Architectural excellence through innovative design</p>
//       </div>

//       <div className="relative">
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto scrollbar-hide gap-6 px-8 pb-4"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {projects.map((project, index) => (
//             <div key={project.id} className="flex-shrink-0 w-80 md:w-96 group cursor-pointer" onClick={() => handleProjectClick(project)}>
//               <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg shadow-lg">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                
//                 {/* Circle Plus Icon */}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
//                     <Plus className="w-8 h-8 text-white" />
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <h3 className="text-white text-xl font-medium tracking-wide mb-2">{project.title}</h3>
//                   <p className="text-gray-300 text-sm tracking-wider">{project.location}</p>
//                   <p className="text-gray-400 text-xs mt-2 tracking-wider">{project.year}</p>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium tracking-wide">{project.title}</h3>
//                 <p className="text-sm text-gray-600 tracking-wider">{project.location} • {project.year}</p>
//                 <p className="text-xs text-gray-500 leading-relaxed">{project.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;