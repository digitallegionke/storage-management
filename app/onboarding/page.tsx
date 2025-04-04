import { OnboardingFlow } from "@/components/onboarding-flow"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Welcome to StorageHub</h1>
      <p className="text-xl mb-8 text-center text-muted-foreground dark:text-gray-300">Let's get your account set up</p>
      <OnboardingFlow />
    </div>
  )
}

