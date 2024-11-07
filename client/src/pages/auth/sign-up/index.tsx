import FloatingShape from "@/animate";
import SignUpPage from "@/components/pages/signup-page";

function AuthSignupPage() {


  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-primary to-secondary flex items-center justify-center relative overflow-hidden mt-20'>
      <FloatingShape color='bg-primary' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-secondary' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-accent' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <SignUpPage />
    </div>
  );
}

export default AuthSignupPage;
