## Prerequisite

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## How to set up the project
Step1. Clone this repository.

Step2. Under the root directory, duplicate **.env.dev** and rename to **.env**, update OPENAI_API_KEY with your real OpenAI key, save it.

```bash
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Step3. Install the dependencies
```bash
yarn
```

Step3.5 (ONLY for iOS, skip on Android) Install Pods
```bash
bundle install
npx pod-install
```

Step4. start Metro
```bash
yarn start
```

Step5. start the App on emulator
```bash
yarn ios
# OR using Android
yarn android
```

Step6. After app launched, use the following credentials to login

Username: **Caremaster**

Password: **caremaster**

## How to run test

```bash
yarn test
```
## Proof video


https://github.com/orochigalois/Code-Challenge-OpenAI-RN/assets/4133977/da0ffb5b-8427-4caa-9fa0-a98c11f54353


