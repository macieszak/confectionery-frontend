import React, { useEffect, useState, useContext } from 'react'
import { AuthContext, useAuth } from '../../../../context/AuthContext'
import axios from '../../../../configuration/axiosConfig'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import './ProfileInfo.css'

import { useForm } from 'react-hook-form'

const ProfileInfo = () => {
	
	const { user, setUser } = useAuth()
	const { logout } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			email: user.email,
			password: '',
		},
	})

	// Effect to update form default values on user change
	useEffect(() => {
		console.log('User data when setting form values:', user)
		setValue('firstName', user.firstName)
		setValue('lastName', user.lastName)
		setValue('phoneNumber', user.phoneNumber)
		setValue('email', user.email)
		setValue('password', '') // Always reset password field
	}, [user, setValue])

	const onSubmit = async formData => {
		try {
			const response = await axios.put(`/user/profile-info/${user.id}`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			})
			const updatedUser = response.data
			if (updatedUser.access_token) {
				localStorage.setItem('access_token', updatedUser.access_token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${updatedUser.access_token}`
			}
			setUser(updatedUser)
			localStorage.setItem('user', JSON.stringify(updatedUser))
			toast.success('Profile updated successfully!')
		} catch (error) {
			if (
				error.response &&
				error.response.status === 409 &&
				error.response.data.error.includes('Email already in use. Please use a different email.')
			) {
				toast.error('This email is already in use. Try another.')
			} else {
				toast.error(`Failed to update profile. Error: ${error.response?.status} ${error.response?.statusText}`)
			}
		}
	}

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            axios.delete(`/user/delete/${user.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            })
            .then(() => {
                toast.success("Account deleted successfully!");
                logout();  
                navigate('/login');  
            })
            .catch(error => {
                toast.error("Failed to delete account.");
            });
        }
    };

	return (
		<div className='profileInfoContainer'>
			<h2>Profile Information</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='firstName'>First Name</label>
				<input type='text' {...register('firstName', { required: true })} />
				{errors.firstName && <p>First name is required.</p>}

				<label htmlFor='lastName'>Last Name</label>
				<input type='text' {...register('lastName', { required: true })} />
				{errors.lastName && <p>Last name is required.</p>}

				<label htmlFor='phoneNumber'>Phone Number (optional)</label>
				<input
					type='text'
					{...register('phoneNumber', {
						pattern: {
							value: /^(\\+?\d{2}-?)?(\d{3}-?){3}$/,
							message: 'Invalid phone number format', // Custom message
						},
					})}
				/>
				{errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

				<label htmlFor='email'>Email</label>
				<input type='email' {...register('email', { required: true })} />
				{errors.email && <p>Email is required.</p>}

				<label htmlFor='password'>New Password (leave blank to keep current)</label>
				<input
					type='password'
					{...register('password', {
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters long',
						},
					})}
				/>
				{errors.password && <p>{errors.password.message}</p>}

				<button type='submit' className='saveChangesButton'>Save Changes</button>
				<button type='button' className='deleteAccountButton' onClick={handleDeleteAccount}>
                    Delete Account
                </button>
			</form>
		</div>
	)
}

export default ProfileInfo
