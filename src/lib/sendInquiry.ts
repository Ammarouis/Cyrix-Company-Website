import { supabase } from "@/integrations/supabase/client";

export type InquiryEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendInquiryEmail(inquiry: InquiryEmail) {
  const { error } = await supabase.functions.invoke("send-inquiry", {
    body: inquiry,
  });

  if (error) throw error;
}
