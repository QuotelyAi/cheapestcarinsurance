package main

import (
	"context"
	"fmt"
	"os"

	"github.com/anthropics/anthropic-sdk-go"
	"github.com/anthropics/anthropic-sdk-go/option"
)

// AnthropicClient wraps the Anthropic SDK for easy use
type AnthropicClient struct {
	client *anthropic.Client
}

// NewAnthropicClient creates a new client using ANTHROPIC_API_KEY env var
func NewAnthropicClient() *AnthropicClient {
	client := anthropic.NewClient()
	return &AnthropicClient{client: client}
}

// NewAnthropicClientWithKey creates a new client with explicit API key
func NewAnthropicClientWithKey(apiKey string) *AnthropicClient {
	client := anthropic.NewClient(option.WithAPIKey(apiKey))
	return &AnthropicClient{client: client}
}

// Chat sends a message to Claude and returns the response
func (c *AnthropicClient) Chat(prompt string) (string, error) {
	message, err := c.client.Messages.New(context.Background(), anthropic.MessageNewParams{
		Model:     anthropic.ModelClaude3_5Sonnet20241022,
		MaxTokens: 1024,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
		},
	})
	if err != nil {
		return "", fmt.Errorf("failed to create message: %w", err)
	}

	if len(message.Content) > 0 {
		if textBlock, ok := message.Content[0].(anthropic.TextBlock); ok {
			return textBlock.Text, nil
		}
	}
	return "", fmt.Errorf("no text content in response")
}

// ChatWithSystem sends a message with a system prompt
func (c *AnthropicClient) ChatWithSystem(systemPrompt, userPrompt string) (string, error) {
	message, err := c.client.Messages.New(context.Background(), anthropic.MessageNewParams{
		Model:     anthropic.ModelClaude3_5Sonnet20241022,
		MaxTokens: 1024,
		System:    []anthropic.TextBlockParam{anthropic.NewTextBlock(systemPrompt)},
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock(userPrompt)),
		},
	})
	if err != nil {
		return "", fmt.Errorf("failed to create message: %w", err)
	}

	if len(message.Content) > 0 {
		if textBlock, ok := message.Content[0].(anthropic.TextBlock); ok {
			return textBlock.Text, nil
		}
	}
	return "", fmt.Errorf("no text content in response")
}

// ExplainInsuranceCoverage explains insurance coverage options to consumers
func (c *AnthropicClient) ExplainInsuranceCoverage(coverageType string) (string, error) {
	systemPrompt := `You are a helpful insurance expert for CheapestCarInsurance.com.
Explain insurance concepts in simple, consumer-friendly terms. Be accurate but avoid
jargon. Focus on helping consumers understand their options and make informed decisions.
Always include a disclaimer that actual coverage details vary by policy and carrier.`

	return c.ChatWithSystem(systemPrompt, fmt.Sprintf("Explain %s coverage for car insurance", coverageType))
}

// GenerateInsuranceTips generates money-saving tips for car insurance
func (c *AnthropicClient) GenerateInsuranceTips(state string) (string, error) {
	systemPrompt := `You are an insurance savings expert. Provide practical, actionable tips
for saving money on car insurance. Be specific and helpful without making guarantees about
specific savings amounts.`

	prompt := fmt.Sprintf("What are the best ways to save money on car insurance in %s?", state)
	return c.ChatWithSystem(systemPrompt, prompt)
}

// CompareInsuranceOptions helps compare different coverage options
func (c *AnthropicClient) CompareInsuranceOptions(option1, option2 string) (string, error) {
	systemPrompt := `You are an unbiased insurance advisor. Compare insurance options fairly,
highlighting pros and cons of each. Help consumers understand trade-offs without pushing
any particular choice.`

	prompt := fmt.Sprintf("Compare %s vs %s for car insurance", option1, option2)
	return c.ChatWithSystem(systemPrompt, prompt)
}

// Example usage - uncomment main() to test
/*
func main() {
	if os.Getenv("ANTHROPIC_API_KEY") == "" {
		fmt.Println("Error: ANTHROPIC_API_KEY environment variable not set")
		os.Exit(1)
	}

	client := NewAnthropicClient()

	// Explain coverage
	explanation, err := client.ExplainInsuranceCoverage("comprehensive")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Coverage Explanation:", explanation)

	// Get tips for Oklahoma
	tips, err := client.GenerateInsuranceTips("Oklahoma")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Saving Tips:", tips)
}
*/
