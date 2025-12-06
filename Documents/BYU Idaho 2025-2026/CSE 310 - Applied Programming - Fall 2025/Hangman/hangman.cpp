#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <random>
#include <chrono>
#include <algorithm>

// This function gets a random word from the provided list
std::string getRandomWord(const std::vector<std::string>& wordList) {
    unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
    std::default_random_engine engine(seed);
    std::uniform_int_distribution<int> dist(0, wordList.size() - 1);
    return wordList[dist(engine)];
}
std::string initializeGuessedWord(const std::string& secretWord);

// This will display the body parts of the stick figure if the user guesses an incorrect letter
void displayHangman(int attemptsLeft) {
    if (attemptsLeft == 6) {
        std::cout << "O" << std::endl;
    }
    else if (attemptsLeft == 5) {
        std::cout << " O" << std::endl;
        std::cout << " |" << std::endl;}
    else if (attemptsLeft == 4) {
        std::cout << " O " << std::endl;
        std::cout << "/|" << std::endl;
    }
    else if (attemptsLeft == 3) {
        std::cout << " O " << std::endl;
        std::cout << "/|\\" << std::endl;
    }
    else if (attemptsLeft == 2) {
        std::cout << " O " << std::endl;
        std::cout << "/|\\" << std::endl;
        std::cout << "/ " << std::endl;
    }
    else if (attemptsLeft == 1) {
        std::cout << " O " << std::endl;
        std::cout << "/|\\" << std::endl;
        std::cout << "/ " << std::endl;
    }
    else if (attemptsLeft == 0) {
        std::cout << " O " << std::endl;
        std::cout << "/|\\" << std::endl;
        std::cout << "/ \\" << std::endl;
    }
}

// This is the main function of the project
int main()
{
    // wordList is where the list of random words are stored.
    std::vector<std::string> wordList = {"programming", "hangman", "computer", "science", "challenge",
                                        "keyboard", "mouse", "apple", "banana", "cherry", "grape", 
                                        "pear", "kiwi", "debug", "house", "truck", "store", "pizza",
                                        "pretzel", "suitcase", "airplane", "hotel", "beach", "cruise"};
    std::string secretWord = getRandomWord(wordList);
    int attemptsLeft = 7;
    std::string displayWord(secretWord.size(), '_');
    std::vector<char> guessedLetters;

    // This is how to loop through the game
    while (attemptsLeft > 0 && displayWord != secretWord)
    {
        // This displays the current state
        std::cout << "Word: " << displayWord << std::endl;
        std::cout << "Attempts left: " << attemptsLeft << "\n";
        std::cout << "Guessed letters: ";
        for (char c : guessedLetters) {
            std::cout << c << " ";
        }
        std::cout << std::endl;
        displayHangman(attemptsLeft);
        
        // This is the player's input
        char guess;
        std::cout << "Enter a letter: ";
        std::cin >> guess;
        guess = std::tolower(guess); // This converts to Lowercase for case-insensitivity
        
        // This gets the total amount of letters guessed
        if (std::find(guessedLetters.begin(), guessedLetters.end(), guess) == guessedLetters.end()) {
            guessedLetters.push_back(guess);
        }
        // If the letter is guessed correctly, then the letters will display here 
        if (secretWord.find(guess) != std::string::npos)
        {
            for (size_t i = 0; i < secretWord.size(); ++i)
            {
                if (secretWord[i] == guess)
                {
                    displayWord[i] = guess;
                }
            }
            std::cout << "Correct!\n";
        }
        // If the letter is guessed incorrectly, then attemptsLeft will add a body part until the game is over
        else
        {
            attemptsLeft--;
            std::cout << "Wrong!\n";
        }
    }
    // This is what the messages will display when the game ends
    if (displayWord == secretWord) {
        std::cout  << "Congradulations! You guessed the correct word: " << secretWord << std::endl;
    } else {
        std::cout << "Game over! The word was: " << secretWord << std::endl;
    }
    return 0;
}
