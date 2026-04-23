import { useFormFieldContext } from "@/providers/form-field"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import * as ImagePicker from "expo-image-picker"
import React from "react"
import { useController } from "react-hook-form"
import { ImagePickerField } from "../image-picker-field"

jest.mock("@/providers/form-field", () => ({
  useFormFieldContext: jest.fn(),
}))

jest.mock("react-hook-form", () => ({
  useController: jest.fn(),
}))

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}))

describe("ImagePickerField", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({ name: "image" })
    ;(useController as jest.Mock).mockReturnValue({
      field: { value: null, onChange: mockOnChange },
      fieldState: { error: null },
    })
    ;(ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    })
    mockOnChange.mockClear()
  })

  it("renders placeholder when no image is selected", () => {
    const { getByText } = render(<ImagePickerField />)
    expect(getByText("Tap To select image")).toBeTruthy()
  })

  it("calls launchImageLibraryAsync when pressed", async () => {
    ;(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: "test-uri" }],
    })

    const { getByLabelText } = render(<ImagePickerField />)
    fireEvent.press(getByLabelText("Select image"))

    await waitFor(() => {
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledWith({ uri: "test-uri" })
    })
  })

  it("renders preview when image is selected", () => {
    ;(useController as jest.Mock).mockReturnValue({
      field: { value: { uri: "test-uri" }, onChange: mockOnChange },
      fieldState: { error: null },
    })

    const { getByLabelText, getByText } = render(<ImagePickerField />)

    expect(getByText("Tap to change")).toBeTruthy()
    expect(getByLabelText("Remove image")).toBeTruthy()
  })

  it("calls onChange(null) when remove button is pressed", () => {
    ;(useController as jest.Mock).mockReturnValue({
      field: { value: { uri: "test-uri" }, onChange: mockOnChange },
      fieldState: { error: null },
    })

    const { getByLabelText } = render(<ImagePickerField />)
    fireEvent.press(getByLabelText("Remove image"))

    expect(mockOnChange).toHaveBeenCalledWith(null)
  })
})
