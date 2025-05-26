import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

// Assuming Input, Textarea, Button, Send are custom components you already have
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type FormValues = {
    name: string;
    email: string;
    message: string;
};

type ContactProps = {
    onMessageSent: () => void;
};

export default function Contact({ onMessageSent }: ContactProps) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);

    const accessKey = "c025a28c-b482-4209-b317-3a989ba4ab26"; // Replace with actual Web3Forms access key

    const { submit: onSubmit } = useWeb3Forms({
        access_key: accessKey,
        settings: {
            from_name: "Your Website",
            subject: "New Contact Message from your Website",
            reply_to: "{{email}}",
            to_name: "namilapreshan11@gmail.com",
            captcha: true,
        },
        onSuccess: (msg: string) => {
            setIsSuccess(true);
            setResult(msg);
            reset();
            onMessageSent();
        },
        onError: (msg: string) => {
            setIsSuccess(false);
            setResult(msg);
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                <Input
                    type="text"
                    placeholder="Your name"
                    className="bg-[#232323] border-[#333] focus:border-blue-500"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-[#232323] border-[#333] focus:border-blue-500"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email address",
                        },
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <Textarea
                    placeholder="Your message"
                    className="bg-[#232323] border-[#333] focus:border-blue-500 min-h-[100px]"
                    {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

                <Button type="submit" className="w-full bg-[#232323] hover:bg-[#2a2a2a] border-[#333]">
                    <Send size={14} className="mr-2" />
                    Send
                </Button>
            </form>

            {result && <p className={`mt-4 text-sm ${isSuccess ? "text-green-500" : "text-red-500"}`}>{result}</p>}
        </div>
    );
}
