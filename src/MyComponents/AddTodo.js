import React, { useState } from 'react';
import { parseTaskWithAI } from '../geminiService';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("medium");

    // --- AI feature state ---
    const [aiText, setAiText] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc, priority);
            setTitle("");
            setDesc("");
            setPriority("medium");
        }
    }

    // This is the new AI feature: user types one sentence, Gemini
    // extracts title/desc/priority, and we PRE-FILL the form above
    // (we don't auto-save) so the user can review/edit before adding.
    const handleSmartAdd = async () => {
        if (!aiText.trim()) return;
        setAiLoading(true);
        setAiError("");
        try {
            const result = await parseTaskWithAI(aiText);
            setTitle(result.title);
            setDesc(result.desc);
            setPriority(result.priority);
        } catch (err) {
            console.error("AI parse failed:", err);
            setAiError("Could not parse that with AI — please fill the form manually.");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="container my-3" >
            <h3>Add your Task</h3>

            {/* --- AI-powered natural language input --- */}
            <div className="mb-3 p-3 border rounded bg-light">
                <label htmlFor="aiInput" className="form-label">
                    Smart Add (describe your task in one sentence)
                </label>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        id="aiInput"
                        className="form-control"
                        placeholder='e.g. "Submit assignment Friday, high priority"'
                        value={aiText}
                        onChange={(e) => setAiText(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={handleSmartAdd}
                        disabled={aiLoading}
                    >
                        {aiLoading ? "Thinking..." : "Fill with AI"}
                    </button>
                </div>
                {aiError && <small className="text-danger">{aiError}</small>}
            </div>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Task Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Task Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select
                        id="priority"
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Task</button>
            </form>
        </div>
    )
}

