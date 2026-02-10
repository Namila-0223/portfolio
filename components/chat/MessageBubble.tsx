// // /components/chat/MessageBubble.tsx
// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// type ChatMsg = {
//   id: string;
//   sender: "namila" | "user" | "system";
//   content: string;
//   time?: string;
//   hasImage?: boolean;
// };

// export default function MessageBubble({ msg }: { msg: ChatMsg }) {
//   const isUser = msg.sender === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 6 }}
//       className={`flex ${isUser ? "justify-end" : ""}`}
//     >
//       {!isUser && (
//         <div className="w-8 h-8 mr-2 flex-shrink-0">
//           <img src="/images/namila.jpg" alt="Namila" width={32} height={32} className="rounded-full object-cover" />
//         </div>
//       )}

//       <div className="flex flex-col max-w-[80%]">
//         <span className={`text-xs mb-1 ${isUser ? "text-right text-gray-400" : "text-gray-400"}`}>
//           {isUser ? "You" : "Namila"}
//         </span>

//         <div
//           className={`p-4 lg:w-96 md:w-96 ${
//             isUser
//               ? "bg-[#1a1a1a] rounded-2xl rounded-tr-none message-bubble-user text-gray-100"
//               : "bg-[#1a1a1a] rounded-2xl rounded-tl-none message-bubble-namila text-gray-100"
//           }`}
//         >
//           <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: escapeHtml(msg.content) }} />
//         </div>

//         <span className={`text-xs mt-1 ${isUser ? "text-right text-gray-500" : "text-gray-500"}`}>{msg.time}</span>
//       </div>

//       {isUser && (
//         <div className="w-8 h-8 ml-2 flex-shrink-0">
//           <img src="/images/user.jpg" alt="You" width={64} height={64} className="rounded-full object-cover" />
//         </div>
//       )}
//     </motion.div>
//   );
// }

// function escapeHtml(str: string) {
//   return String(str || "")
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll("\n", "<br/>");
// }

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import { ExternalLink } from "lucide-react";

export default function MessageBubble({
  msg,
  onSubmitContact,
}: {
  msg: any;
  onSubmitContact?: (data: any) => void;
}) {
  const isUser = msg.sender === "user";
  const isSystem = msg.sender === "system";

  /** CONTACT FORM LOGIC */
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hideForm, setHideForm] = useState(false);

  /** 🔥 SYSTEM CONTACT FORM BUBBLE */
  if (isSystem && msg.content === "__contact_form__") {
    return (
      <div className="flex justify-start px-2">
        <div className="w-8 h-8 mr-3 flex-shrink-0">
          <img
            src="/images/namila_1.webp"
            alt="Namila"
            className="rounded-full object-cover w-8 h-8"
          />
        </div>

        <div className="max-w-[76%]">
          <div
            className={`
              p-3 rounded-2xl bg-[#1A1A1A] rounded-tl-none text-gray-100 text-sm 
              transition-all duration-500 ease-out
              ${hideForm ? "opacity-0 -translate-y-2" : "opacity-100"}
            `}
          >
            {!isSubmitting && (
              <>
                <div className="font-semibold mb-2">Contact me</div>

                <input
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-3 py-2 text-sm mb-2"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-3 py-2 text-sm mb-2"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <textarea
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-3 py-2 text-sm mb-3 min-h-[80px]"
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                  onClick={() => {
                    setIsSubmitting(true);
                    setHideForm(true);

                    setTimeout(() => {
                      onSubmitContact?.(form);
                    }, 400);
                  }}
                >
                  Send message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /** PROJECT BUBBLE */
  const hasPreview = msg.hasImage || msg.hasLottie;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-2`}>
      {!isUser && (
        <div className="w-8 h-8 mr-3 flex-shrink-0">
          <img
            src="/images/namila_1.webp"
            alt="Namila"
            className="rounded-full object-cover w-8 h-8"
          />
        </div>
      )}

      <div className="max-w-[64%]">
        {/* 🔥 EVERYTHING INSIDE ONE BUBBLE */}
        <div
          className={`p-3 rounded-2xl text-sm ${isUser
              ? "bg-[#1f1f1f] rounded-tr-none text-gray-100"
              : "bg-[#1A1A1A] rounded-tl-none text-gray-100"
            }`}
        >
          {/* TEXT MESSAGE */}
          <div dangerouslySetInnerHTML={{ __html: msg.content || "" }} />

          {/* 🔥 PROJECT IMAGE / LOTTIE INSIDE SAME BUBBLE */}
          {hasPreview && (
            <div className="mt-3">
              {msg.externalUrl ? (
                <a
                  href={msg.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {/* PREVIEW BOX */}
                  <div className="relative overflow-hidden rounded-xl">
                    {msg.hasLottie ? (
                      <div
                        className="w-full rounded-xl overflow-hidden"
                        style={{
                          backgroundImage: "url('/images/cardbg.jpg')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <Lottie
                          animationData={msg.lottieData}
                          className="w-full h-56 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                          loop
                          autoplay
                        />
                      </div>
                    ) : (
                      <Image
                        src={msg.imageSrc}
                        alt={msg.imageAlt}
                        width={400}
                        height={225}
                        className="rounded-xl w-full object-cover shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                        style={{ aspectRatio: "16/9", height: "auto" }}
                      />
                    )}
                  </div>
                </a>
              ) : (
                <div className="relative overflow-hidden rounded-xl">
                  {msg.hasLottie ? (
                    <div
                      className="w-full rounded-xl overflow-hidden"
                      style={{
                        backgroundImage: "url('/images/cardbg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Lottie
                        animationData={msg.lottieData}
                        className="w-full h-56 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                        loop
                        autoplay
                      />
                    </div>
                  ) : (
                    <Image
                      src={msg.imageSrc}
                      alt={msg.imageAlt}
                      width={400}
                      height={225}
                      className="rounded-xl w-full object-cover shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                      style={{ aspectRatio: "16/9", height: "auto" }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
          {/* PROFILE PREVIEW */}
          {msg.hasProfileImage && (
            <div className="mt-3 mb-2 flex flex-col items-center">
              <Image
                src={msg.profileImageSrc || "/images/profile_3_1.webp"}
                alt="Profile"
                width={400}
                height={400}
                className="rounded-xl object-cover shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  aspectRatio: "1/1",
                  height: "auto",
                  maxWidth: "200px",
                }}
              />

              <p className="text-center mt-2 text-xs text-gray-400">
                That&rsquo;s me 😎
              </p>
            </div>
          )}

          {/* TOOLS / TECHNOLOGIES LIST */}
          {msg.tools && Array.isArray(msg.tools) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {msg.tools.map((tool: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-800 rounded-full px-3 py-1"
                >
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <span className="text-xs text-gray-200">{tool.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TIME */}
        <div
          className={`text-xs mt-1 text-gray-500 ${isUser ? "text-right" : ""}`}
        >
          {msg.time}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 ml-3 flex-shrink-0">
          <img
            src="/images/user_1.webp"
            alt="You"
            className="rounded-full object-cover w-8 h-8"
          />
        </div>
      )}
    </div>
  );
}
