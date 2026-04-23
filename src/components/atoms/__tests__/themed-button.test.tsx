import { fireEvent, render } from "@testing-library/react-native"
import React from "react"
import { useColorScheme } from "react-native"
import ThemedButton from "../themed-button"

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: jest.fn(),
}))

describe("ThemedButton", () => {
  beforeEach(() => {
    ;(useColorScheme as jest.Mock).mockReturnValue("light")
  })

  it("renders correctly with title", () => {
    const { getByText } = render(<ThemedButton title="Click me" />)
    expect(getByText("Click me")).toBeTruthy()
  })

  it("handles loading state", () => {
    const { getByRole, queryByText } = render(<ThemedButton title="Click me" isLoading />)

    expect(queryByText("Click me")).toBeNull()

    const button = getByRole("button")
    expect(button.props.accessibilityState.disabled).toBe(true)
  })

  it("calls onPress when clicked", () => {
    const onPress = jest.fn()
    const { getByText } = render(<ThemedButton title="Click me" onPress={onPress} />)

    fireEvent.press(getByText("Click me"))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn()
    const { getByRole } = render(<ThemedButton title="Click me" onPress={onPress} disabled />)

    const button = getByRole("button")
    expect(button.props.accessibilityState.disabled).toBe(true)

    fireEvent.press(button)
    expect(onPress).not.toHaveBeenCalled()
  })
})
