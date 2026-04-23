import { useFormFieldContext } from "@/providers/form-field"
import { render } from "@testing-library/react-native"
import React from "react"
import FormMessage from "../form-message"

jest.mock("@/providers/form-field", () => ({
  useFormFieldContext: jest.fn(),
}))

describe("FormMessage", () => {
  it("renders null when there is no error", () => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({ error: null })
    const { queryByText } = render(<FormMessage>Fallback</FormMessage>)

    expect(queryByText("Fallback")).toBeTruthy()
  })

  it("renders error message from error.message", () => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({
      error: { message: "Something went wrong" },
    })
    const { getByText } = render(<FormMessage>Fallback</FormMessage>)

    expect(getByText("Something went wrong")).toBeTruthy()
  })

  it("joins multiple error messages if error is an object of FieldErrors", () => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({
      error: {
        type: { message: "Type is required" },
        name: { message: "Name is too short" },
      },
    })
    const { getByText } = render(<FormMessage />)

    expect(getByText("Type is required, Name is too short")).toBeTruthy()
  })

  it("renders children if no error is present", () => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({ error: null })
    const { getByText } = render(<FormMessage>Default error</FormMessage>)

    expect(getByText("Default error")).toBeTruthy()
  })

  it("renders null if no error and no children", () => {
    ;(useFormFieldContext as jest.Mock).mockReturnValue({ error: null })
    const { toJSON } = render(<FormMessage />)

    expect(toJSON()).toBeNull()
  })
})
