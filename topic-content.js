// Topic Content Database
// This file contains detailed content for each topic

function getTopicContent(problemId, topic) {
    const topicDatabase = {
        // Python Fundamentals
        'py1': {
            title: 'Python Data Types: Lists, Tuples, Sets, Dictionaries',
            overview: `
                <p>Python provides several built-in data structures that are essential for data science work. Understanding these data types is fundamental to writing efficient Python code.</p>
                <p>Each data structure has unique characteristics that make it suitable for different use cases:</p>
                <ul>
                    <li><strong>Lists:</strong> Ordered, mutable collections that can contain duplicate elements</li>
                    <li><strong>Tuples:</strong> Ordered, immutable collections that are memory efficient</li>
                    <li><strong>Sets:</strong> Unordered collections of unique elements with fast membership testing</li>
                    <li><strong>Dictionaries:</strong> Key-value pairs for fast lookups and data mapping</li>
                </ul>
            `,
            keyConcepts: `
                <h3>Lists</h3>
                <p>Lists are the most versatile data structure in Python. They're mutable, meaning you can modify them after creation.</p>
                <ul>
                    <li>Creating lists: <code>my_list = [1, 2, 3, 'four']</code></li>
                    <li>List methods: append(), extend(), insert(), remove(), pop(), sort()</li>
                    <li>Slicing: <code>my_list[1:3]</code></li>
                    <li>List comprehensions for efficient data processing</li>
                </ul>
                
                <h3>Tuples</h3>
                <p>Tuples are immutable sequences, perfect for data that shouldn't change.</p>
                <ul>
                    <li>Creating tuples: <code>my_tuple = (1, 2, 3)</code></li>
                    <li>Unpacking: <code>x, y, z = my_tuple</code></li>
                    <li>Use cases: function return values, dictionary keys</li>
                </ul>
                
                <h3>Sets</h3>
                <p>Sets provide mathematical set operations and fast membership testing.</p>
                <ul>
                    <li>Creating sets: <code>my_set = {1, 2, 3}</code></li>
                    <li>Operations: union, intersection, difference, symmetric_difference</li>
                    <li>Removing duplicates from sequences</li>
                </ul>
                
                <h3>Dictionaries</h3>
                <p>Dictionaries are hash maps that provide O(1) average case lookup time.</p>
                <ul>
                    <li>Creating dicts: <code>my_dict = {'key': 'value'}</code></li>
                    <li>Methods: get(), keys(), values(), items(), update()</li>
                    <li>Dictionary comprehensions</li>
                </ul>
            `,
            codeExample: `
                <div class="code-block">
                    <pre># Lists - Mutable ordered collections
my_list = [1, 2, 3, 4, 5]
my_list.append(6)
my_list[0] = 0
print("List:", my_list)  # [0, 2, 3, 4, 5, 6]

# List comprehension
squares = [x**2 for x in range(5)]
print("Squares:", squares)  # [0, 1, 4, 9, 16]

# Tuples - Immutable ordered collections
my_tuple = (10, 20, 30)
x, y, z = my_tuple  # Unpacking
print(f"Tuple values: x={x}, y={y}, z={z}")

# Sets - Unordered unique elements
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}
print("Intersection:", set1 & set2)  # {3, 4}
print("Union:", set1 | set2)  # {1, 2, 3, 4, 5, 6}

# Dictionaries - Key-value pairs
person = {
    'name': 'Alice',
    'age': 30,
    'city': 'New York'
}
person['occupation'] = 'Data Scientist'
print("Dictionary:", person)

# Dictionary comprehension
squared_dict = {x: x**2 for x in range(5)}
print("Squared dict:", squared_dict)</pre>
                </div>
            `,
            resources: `
                <div class="resource-card">
                    <h4>📖 Python Documentation</h4>
                    <p>Official Python data structures guide</p>
                    <a href="https://docs.python.org/3/tutorial/datastructures.html" target="_blank">Read More →</a>
                </div>
                <div class="resource-card">
                    <h4>🎥 Real Python Tutorial</h4>
                    <p>Comprehensive guide to Python data types</p>
                    <a href="https://realpython.com/python-data-types/" target="_blank">Watch Tutorial →</a>
                </div>
                <div class="resource-card">
                    <h4>💻 Practice on LeetCode</h4>
                    <p>Array and hashtable problems</p>
                    <a href="https://leetcode.com/tag/array/" target="_blank">Start Practicing →</a>
                </div>
            `
        },
        
        // Default content for topics without specific content
        'default': {
            title: 'Topic Content',
            overview: `
                <p>This topic covers important concepts in data science and machine learning.</p>
                <p>We're constantly adding more detailed content for each topic. Check back soon for comprehensive guides, code examples, and learning resources.</p>
            `,
            keyConcepts: `
                <ul>
                    <li>Understand the fundamental concepts</li>
                    <li>Learn best practices and common patterns</li>
                    <li>Apply knowledge through hands-on practice</li>
                    <li>Explore real-world applications</li>
                </ul>
            `,
            codeExample: `
                <div class="code-block">
                    <pre># Example code will be added soon
# Stay tuned for comprehensive examples</pre>
                </div>
            `,
            resources: `
                <div class="resource-card">
                    <h4>📖 Documentation</h4>
                    <p>Official documentation and guides</p>
                    <a href="#" target="_blank">Coming Soon →</a>
                </div>
                <div class="resource-card">
                    <h4>🎥 Video Tutorials</h4>
                    <p>Step-by-step video guides</p>
                    <a href="#" target="_blank">Coming Soon →</a>
                </div>
                <div class="resource-card">
                    <h4>💻 Practice Problems</h4>
                    <p>Hands-on coding exercises</p>
                    <a href="#" target="_blank">Coming Soon →</a>
                </div>
            `
        }
    };
    
    // Return specific content or default
    return topicDatabase[problemId] || topicDatabase['default'];
}

