'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de inicio de sesión
    console.log('Login', { loginEmail, loginPassword });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de registro
    console.log('Register', { registerEmail, registerPassword });
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de recuperación de contraseña
    console.log('Forgot Password', { forgotPasswordEmail });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Ingresar</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Ingresar</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="tu@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <Input id="login-password" type="password" placeholder="Tu contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">Ingresar</Button>
                </div>
              </form>
              <div className="mt-4 text-center">
                  <a href="#" onClick={() => alert('Funcionalidad de recuperar contraseña no implementada')} className="text-sm text-blue-500 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Registrarse</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="tu@email.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input id="register-password" type="password" placeholder="Tu contraseña" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">Registrarse</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
