import styles from "./userDetails.module.css"

function UserDetails({ user }) {
  console.log(user, "user")
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h2 className={styles.heading}>{user.firstName} {user.lastName}</h2>
        <p>{user.company.title}</p>
        <p>{user.address.city}, {user.address.state}, {user.address.country}</p>
      </div>
      <div className={styles.detailsContainer}>
        <h2 className={styles.heading}>Personal Information</h2>
        <div className={styles.details}>
          <ul className={styles.list}>
            <li>Email: <span>{user.email}</span></li>
            <li>Age: <span>{user.age}</span></li>
            <li>Gender : <span>{user.gender}</span></li>
          </ul>
          <ul className={styles.list}>
            <li>Height : <span>{user.height}</span></li>
            <li>Eye color:  <span>{user.eyeColor}</span></li>
            <li>Hair color: <span>{user.hair.color}</span></li>
          </ul>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <h2 className={styles.heading}>Address</h2>
        <div className={styles.details}>
          <ul className={styles.list}>
            <li>Address: <span>{user.address.address}</span></li>
            <li>Country : <span>{user.address.country}</span></li>
            <li>City: <span>{user.address.city}</span></li>
            <li>Postal Code : <span>{user.address.postalCode}</span></li>
          </ul>
          <ul className={styles.list}>
            <li>State:  <span>{user.address.state}</span></li>
            <li>lat : <span>{user.address.coordinates.lat}</span></li>
            <li>lng : <span>{user.address.coordinates.lng}</span></li>
          </ul>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <h2 className={styles.heading}>Company</h2>
        <div className={styles.details}>
          <ul className={styles.list}>
            <li>Department:  <span>{user.company.department}</span></li>
            <li>name : <span>{user.company.name}</span></li>
            <li>title : <span>{user.company.title}</span></li>
          </ul>
          <ul className={styles.list}>
            <li>Address: <span>{user.company.address.address}</span></li>
            <li>Country : <span>{user.company.address.country}</span></li>
            <li>City: <span>{user.company.address.city}</span></li>
            <li>Postal Code : <span>{user.address.postalCode}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
