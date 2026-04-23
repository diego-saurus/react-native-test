## Notes
- I dont know what the font using in figma, so i used default expo configuration, but im still applying font size, weight, and color to match figma
- based on picsum detail api, they didnt provide any information, so i just hardcoded the description and image title. but the author and image still querying from api
- The api also didnt provide any search mechanisms, so i just use local search

## Package Detail
This project is created using blank template for simplicity

```bash
pnpm create expo-app react-native-test --template blank-typescript
```

### Prettier
For sort import and code styling

### Router / Navigation
Im using expo-router for navigation
```bash
pnpm exec expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### SVG Icon
For SVG im using online [transform tools](https://transform.tools/svg-to-react-native) to manually convert from markup svg to react native svg 

### React Hook form
Im using react hook form + zod for form handling


