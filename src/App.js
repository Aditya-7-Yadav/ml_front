"use client";
import { useRef, useState } from "react";
import {
  FiAward, FiBarChart2, FiBriefcase, FiCpu, FiFileText,
  FiGithub, FiHardDrive, FiTerminal, FiUpload,
  FiUsers, FiZap, FiCheckCircle, FiCode
} from "react-icons/fi";

export default function CareerForm() {
  const formRef = useRef(null);
  const metricsRef = useRef(null);
  const [formData, setFormData] = useState({
    class10:"", class12:"", cgpa:"", hackathons:"",
    hackathonsWon:"", workshops:"", leetcodeQuestions:"",
    githubContributions:"", internshipCompany:"",
    internshipTenure:"", workshopCertificates:[]
  });
  const [result,setResult] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = e=>{
    const {name,value}=e.target;
    setFormData(p=>({...p,[name]:value}));
  };
  const handleFileChange = e=>{
    setFormData(p=>({...p,workshopCertificates:Array.from(e.target.files)}));
  };
  const handleSubmit = async e=>{
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    const fd = new FormData();
    Object.entries(formData).forEach(([k,v])=>{
      if(k==="workshopCertificates") v.forEach(f=>fd.append(k,f));
      else fd.append(k,v);
    });
    try{
      const res=await fetch("http://localhost:5000/predict",{method:"POST",body:fd});
      const data=await res.json();
      setResult(data);
    }catch(err){
      console.error(err);
      setResult({error:"Failed to get prediction."});
    }finally{setIsLoading(false);}
  };

  const smoothScrollTo = (ref, block = 'start') => {
    if (!ref.current) return;
    const targetElement = ref.current;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    let finalPosition = targetPosition;
    if (block === 'center') {
      const elementHeight = targetElement.offsetHeight;
      const windowHeight = window.innerHeight;
      finalPosition = targetPosition - (windowHeight / 2) + (elementHeight / 2);
    }
    const duration = 1500;
    let startTime = null;
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, finalPosition - startPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollToForm = () => smoothScrollTo(formRef);
  const scrollToMetrics = () => smoothScrollTo(metricsRef, 'center');

  const fields=[
    {name:"class10",label:"Class 10th %",icon:<FiFileText/>},
    {name:"class12",label:"Class 12th %",icon:<FiFileText/>},
    {name:"cgpa",label:"Current CGPA",icon:<FiBarChart2/>},
    {name:"hackathons",label:"Hackathons Attended",icon:<FiCpu/>},
    {name:"hackathonsWon",label:"Hackathons Won",icon:<FiAward/>},
    {name:"workshops",label:"Workshops Attended",icon:<FiUsers/>},
    {name:"leetcodeQuestions",label:"LeetCode Qs (past year)",icon:<FiTerminal/>},
    {name:"githubContributions",label:"GitHub Contributions (past year)",icon:<FiGithub/>}
  ];
  const internshipFields=[
    {name:"internshipCompany",label:"Internship Company",icon:<FiBriefcase/>,type:"text"},
    {name:"internshipTenure",label:"Internship Tenure (e.g., 3 months)",icon:<FiHardDrive/>,type:"text"}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 font-sans relative overflow-hidden geist-sans">
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Geist+Sans:wght@300;400;500;700&display=swap');
          .geist-sans{font-family:'Geist Sans',sans-serif;font-weight:300;}
          .font-mono{font-family:'Geist Mono',monospace;}
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
          @keyframes blob{
            0%{transform:translate(0,0)scale(1);}
            33%{transform:translate(30px,-50px)scale(1.1);}
            66%{transform:translate(-20px,20px)scale(0.9);}
            100%{transform:translate(0,0)scale(1);}
          }
          .animate-blob{animation:blob 7s infinite cubic-bezier(0.68,-0.55,0.27,1.55);}
          .animation-delay-2000{animation-delay:2s;}
          .animation-delay-4000{animation-delay:4s;}
        `}</style>

        <div className="text-center relative p-6 rounded-xl">
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-xl -z-10 hidden lg:block"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight font-mono">
            Chart Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 block">
              Success Story
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Your academic achievements and practical experience are key. Fill out the form to unlock insights into your career readiness and get personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
              <FiZap className="mr-2"/> Get Started
            </button>
            <button type="button" onClick={scrollToMetrics}
              className="inline-flex items-center justify-center bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-50 transition-transform transform hover:scale-105 shadow-md">
              Learn More
            </button>
          </div>
          <div ref={metricsRef} className="mt-24 text-gray-700">
            <h3 className="text-xl font-medium mb-4 flex items-center justify-center font-mono">
              <FiBarChart2 className="mr-2 text-blue-500"/> Key Metrics for Growth
            </h3>
            <ul className="text-left max-w-sm mx-auto space-y-2">
              <li className="flex items-center"><FiCheckCircle className="mr-2 text-green-500"/> Academic Performance</li>
              <li className="flex items-center"><FiCode className="mr-2 text-indigo-500"/> Coding & Development Skills</li>
              <li className="flex items-center"><FiAward className="mr-2 text-yellow-500"/> Project & Innovation Experience</li>
            </ul>
          </div>
        </div>

        <div ref={formRef} id="form-section" className="mt-16 w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 lg:p-10 border border-gray-200">
          <h2 className="text-2xl font-medium text-center mb-8 text-gray-800 font-mono">Career Readiness Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(field=>(
                <div key={field.name} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">{field.icon}</div>
                  <input type="number" name={field.name} placeholder={field.label} value={formData[field.name]} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all group-hover:border-blue-400 group-hover:bg-blue-50"/>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internshipFields.map(field=>(
                <div key={field.name} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">{field.icon}</div>
                  <input type={field.type} name={field.name} placeholder={field.label} value={formData[field.name]} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all group-hover:border-blue-400 group-hover:bg-blue-50"/>
                </div>
              ))}
            </div>

            {/* --- UPDATED FILE INPUT (Small & Centered) --- */}
            <div className="flex justify-center"> {/* Added this div for centering */}
              <label htmlFor="file-upload" className="w-auto max-w-xs px-3 py-2 text-center bg-white border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group-hover:border-blue-400 flex items-center justify-center">
                <FiUpload className="w-5 h-5 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors"/>
                <span className="text-gray-600 group-hover:text-blue-700 transition-colors text-sm">
                  {formData.workshopCertificates.length > 0
                    ? `${formData.workshopCertificates.length} file(s) selected`
                    : "Upload Certificates"}
                </span>
              </label>
              <input id="file-upload" type="file" name="workshopCertificates" multiple onChange={handleFileChange} className="hidden"/>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-auto bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Calculating..." : "Submit for Analysis"}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4 font-mono">Prediction Result</h2>
              <div className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-x-auto">
                <pre className="font-mono">{JSON.stringify(result,null,2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
