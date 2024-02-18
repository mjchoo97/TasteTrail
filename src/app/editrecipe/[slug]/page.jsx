"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { slugify } from "../../../../lib/utils";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { revalidatePath } from "next/cache";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("wrong");
  }

  return res.json();
};

const EditRecipe = ({ params }) => {
  const { slug } = params;

  const [id, setID] = useState("");
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

  const editData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `editrecipe/${slugify(name)}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          category: cat,
          ingredients: ingredients,
          instructions: instructions,
          recipeslugs: slugify(name),
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      toast.error("Fail to update recipe");
      throw new Error("wrong");
    }

    return res.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(editData(), {
      loading: "Saving...",
      success: <b>Successfully updated!</b>,
      error: <b>Could not update.</b>,
    });
    router.push(`/recipe/${slugify(name)}`);
  };

  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `recipe/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCat(data.category);
      setIngredients(data.ingredients);
      setInstructions(data.instructions);
      setID(data._id);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.rightcontainer}>
        <div className={styles.imgContainer}>
          <Image
            src="/editrecipe.png"
            alt="editrecipe"
            fill
            className={styles.editimg}
          />
        </div>
      </div>
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div className={styles.leftcontainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.name}>
              <label className={styles.inputLabel}>DISH NAME</label>
              <input
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={styles.name}>
              <label className={styles.inputLabel}>CATEGORY</label>
              <input
                name="category"
                placeholder="Category"
                onChange={(e) => setCat(e.target.value)}
                value={cat}
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
                        <div className={styles.no}>{`${i + 1}. `}</div>
                        <div key={i}>{instruction}</div>
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
      )}
    </div>
  );
};

export default EditRecipe;
