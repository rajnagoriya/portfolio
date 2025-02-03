import { AiFillLinkedin, AiFillTwitterCircle, AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import emailjs from "emailjs-com";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
gsap.registerPlugin(ScrollTrigger);

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const messageEmail = formData.message + " and email is " + formData.email;
  
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: messageEmail,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
  
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Error sending message.");
      console.error("EmailJS Error:", error);
    }
  
    setLoading(false);
  };

  useGSAP(() => {
    gsap.from("#contactHeading", {
      rotateY: -90,
      opacity: 0,
      duration: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#contactHeading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  // Smooth animation for anchor tags
  useGSAP(() => {
    gsap.from("#socialLinks", {
      y: 20,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3, // Smooth stagger effect
      ease: "back.out(1.7)", // More natural bounce effect
      scrollTrigger: {
        trigger: "#socialLinks",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  // Smooth form animation
  useGSAP(() => {
    gsap.from("#contactForm", {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contactForm",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="bg-black w-screen px-8 relative">
      <div className="h-full w-full rounded-3xl bg-cover bg-black p-[5vw]">
        
        <h2 id="contactHeading" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-white text-start underline">
        Contact Me
        </h2>
        <div className="w-full p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 rounded-xl">
          {/* Social Links Section */}
          <div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-md font-[anzo3]">
            <div id="socialLinks" className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/raj-nagoriya/"
                target="_blank"
                rel="noopener noreferrer"
                className="socialLinksA flex items-center text-white text-lg hover:text-blue-500 transition"
              >
                <AiFillLinkedin className="text-3xl mr-3" />
                LinkedIn
              </a>
              <a
                href="https://x.com/Raj_Nagoriya03"
                target="_blank"
                rel="noopener noreferrer"
                className="socialLinksA flex items-center text-white text-lg hover:text-blue-400 transition"
              >
                <AiFillTwitterCircle className="text-3xl mr-3" />
                Twitter
              </a>
              <a
                href="mailto:rajnagoriya3@email.com"
                className="socialLinksA flex items-center text-white text-lg hover:text-red-400 transition"
              >
                <AiOutlineMail className="text-3xl mr-3" />
                rajnagoriya3@email.com
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div id="contactForm" className="p-6 rounded-lg shadow-md font-[anzo3]">
            <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;