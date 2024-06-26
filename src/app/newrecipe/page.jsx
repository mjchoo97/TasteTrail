"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { addRecipe } from "../../../lib/action";
import { slugify } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewRecipe = () => {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({
    volume: "",
    unit: "",
    ingredient: "",
  });
  const [instructions, setInstructions] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const [editingField, seteditingField] = useState();

  const ingField = [
    {
      id: 1,
      name: "ingredient",
      type: "text",
      placeholder: "Ingredient",
      label: "Ingredient",
    },
    {
      id: 2,
      name: "volume",
      type: "text",
      placeholder: "Amount",
      label: "Amount",
    },
    {
      id: 3,
      name: "unit",
      type: "text",
      placeholder: "Unit",
      label: "Unit",
    },
  ];

  const handleClick = () => {
    setIngredients([...ingredients, ingredient]);
    setIngredient({ volume: "", unit: "", ingredient: "" });
  };

  const handleDelete = (ingToDelete) => {
    setIngredients(ingredients.filter((ing) => ing.ingredient !== ingToDelete));
  };

  const handleAddSteps = (e) => {
    setInstructions([...instructions, instruction]);
    setInstruction("");
  };

  const handleDeleteSteps = (StepToDelete) => {
    setInstructions(instructions.filter((ins) => ins !== StepToDelete));
  };

  const handleRearrange = (i, dir) => {
    const newInstructions = [...instructions];
    console.log(i);
    switch (dir) {
      case "up":
        if (i > 0) {
          [newInstructions[i - 1], newInstructions[i]] = [
            newInstructions[i],
            newInstructions[i - 1],
          ];
        }
        break;
      case "down":
        if (i < newInstructions.length - 1) {
          [newInstructions[i], newInstructions[i + 1]] = [
            newInstructions[i + 1],
            newInstructions[i],
          ];
        }
        break;
    }

    setInstructions(newInstructions);
  };

  const handleFieldEdit = (i) => {
    setisEdit((prevState) => !prevState);
    if (isEdit) {
      seteditingField();
    } else {
      seteditingField(i);
    }
  };

  const handleFieldChange = (e) => {
    const newInstructions = [...instructions];
    newInstructions[editingField] = e.target.value;
    setInstructions(newInstructions);
  };

  const postData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "newrecipe",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          category: cat,
          ingredients: ingredients,
          instructions: instructions,
          recipeslugs: slugify(name),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      // toast.error("Fail to create recipe");

      throw new Error("wrong");
    }
    router.push(`/recipe/${slugify(name)}`);
    return res.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(postData(), {
      loading: "Saving...",
      success: <b>Successfully added!</b>,
      error: <b>Could not add.</b>,
    });
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.name}>
            <label className={styles.inputLabel}>DISH NAME</label>
            <input
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.name}>
            <label className={styles.inputLabel}>CATEGORY</label>
            <input
              name="category"
              placeholder="Category"
              onChange={(e) => setCat(e.target.value)}
            />
          </div>
          <div className={styles.inputLabel}>INGREDIENT</div>
          {ingField.map((ings) => {
            return (
              <div key={ings.id} className={styles.ingsWrapper}>
                <label>{ings.label}</label>
                <input
                  value={ingredient[ings.name]}
                  placeholder={ings.placeholder}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      [ings.name]: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
          <button
            className={styles.addbutton}
            type="button"
            onClick={handleClick}
          >
            Add Ingredient
          </button>

          {ingredients.length > 0 && (
            <div className={styles.ingContainer}>
              {ingredients.map((ing, ind) => {
                return (
                  <div key={ind} className={styles.ingWrapper}>
                    <button
                      type="button"
                      className={styles.delete}
                      onClick={() => handleDelete(ing.ingredient)}
                    >
                      X
                    </button>
                    <div className={styles.addeding}>
                      {ing.volume + ` ` + ing.unit + ` ` + ing.ingredient}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className={styles.inputLabel}>INSTRUCTIONS</div>
          <div className={styles.ingsWrapper}>
            <label>Steps:</label>
            <textarea
              value={instruction}
              placeholder="Add your steps here..."
              onChange={(e) => setInstruction(e.target.value)}
            />
          </div>
          <button
            className={styles.addbutton}
            type="button"
            onClick={handleAddSteps}
          >
            Add Steps
          </button>

          <div className={styles.stepwrapper}>
            {instructions.length > 0 && (
              <>
                {instructions.map((instruction, i) => {
                  return (
                    <div key={i} className={styles.stepcontainer}>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleDeleteSteps(instruction)}
                      >
                        X
                      </button>
                      <button
                        type="button"
                        className={styles.up}
                        onClick={() => handleRearrange(i, "up")}
                      >
                        ^
                      </button>
                      <button
                        type="button"
                        className={styles.down}
                        onClick={() => handleRearrange(i, "down")}
                      >
                        v
                      </button>
                      <button
                        type="button"
                        className={styles.editbutton}
                        onClick={() => handleFieldEdit(i)}
                      >
                        <img
                          src="/edit.png"
                          alt="editicon"
                          fill
                          className={styles.editicon}
                        />
                      </button>
                      <div className={styles.no}>{`${i + 1}. `}</div>
                      {i === editingField ? (
                        <input
                          value={instruction}
                          onChange={(e) => handleFieldChange(e)}
                          className={styles.editinputfield}
                        />
                      ) : (
                        <div key={i}>{instruction}</div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <button className={styles.submitbutton} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.imageclass}
            src="/newrecipe.png"
            alt="addrecipe"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
